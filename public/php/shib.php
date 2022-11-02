<?php

/** This is the Shibboleth SSO callback script.
 * @author Tim Chen <tim@delta.games>
 * @version 1.0.0
 */

const API_INIT = 'https://certitude-demo.delta.games/iAPI/shibCallback';
const API_SUCCESS = 'https://certitude-demo.delta.games/iAPI/shibCallbackSuccess';
const HOME_PAGE = 'https://certitude-demo.delta.games';

echo 'Processing your request...';

parse_str($_SERVER['QUERY_STRING'], $query);
// Contains the JWT
$token = $query['token'];
$authorization = "Authorization: Bearer $token";
// Contains the university secret key and user ID verified by the university
$identifier = $_SERVER['HTTP_IDENTIFIER'];
// Initiate the cURL session
$req = curl_init(API_INIT);
curl_setopt($req, CURLOPT_HTTPHEADER, array('Content-Type: application/json' , $authorization));
curl_setopt($req, CURLOPT_POST, true);
curl_setopt($req, CURLOPT_POSTFIELDS, array(
    'identifier' => $identifier
));
curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
// Execute the cURL session
$res = curl_exec($req);
// Close the cURL session
curl_close($req);
// Decode the response
$res = json_decode($res, true);
// Check the response
if ($res['status'] === 'success') {
    // Initiate socket connection
    $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
    if ($socket === false) {
        echo 'socket_create() failed: reason: ' . socket_strerror(socket_last_error()) . '';
        header('Location: ' . HOME_PAGE . '/error');
        return;
    }
    // Connect to the server
    $address = json_decode($res['msg']['json'])['sIP'];
    $port = json_decode($res['msg']['json'])['sPort'];
    $result = socket_connect($socket, $address, $port);
    if ($result === false) {
        echo 'socket_connect() failed: reason: ' . socket_strerror(socket_last_error($socket)) . '';
        header('Location: ' . HOME_PAGE . '/error');
        return;
    }
    /*
    * Flow: 
    * 1. User sends the init request to the server
    * 2. Server queries the database for the user's information
    * 3. Server sends the user's information to the client
    * 4. Socket closes after receiving the "bye" message
    */

    $student_id = json_decode($identifier)->studentId;
    $init = "['init',$student_id]";
    socket_write($socket, $init, strlen($init));
    $out = '';
    while ($out = socket_read($socket, 2048)) {
        $json = json_decode($out);
        echo var_dump($json[1]);
        if ($json[0] == 'bye') {
            // Begin cURL session
            $req = curl_init(API_SUCCESS);
            curl_setopt($req, CURLOPT_POST, true);
            curl_setopt($req, CURLOPT_POSTFIELDS, array(
                'results' => $json[1],
            ));
            curl_setopt($req, CURLOPT_RETURNTRANSFER, true);
            // Execute the cURL session
            $res = curl_exec($req);
            // Close the cURL session
            curl_close($req);
            break;
        }
    }
} else {
    // Redirect to the error page
    header('Location: ' . HOME_PAGE . '/error');
}
