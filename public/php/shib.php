<?php

/** This is the Shibboleth SSO callback script.
 * @author Tim Chen <tim@delta.games>
 * @version 1.0.0
 */

const API = 'https://certitude-demo.delta.games/iAPI/shibCallback';
const HOME_PAGE = 'https://certitude-demo.delta.games';

echo 'Processing your request...';

parse_str($_SERVER['QUERY_STRING'], $query);
// Contains the JWT
$token = $query['token'];
// Contains the university secret key and user ID verified by the university
$identifier = $_SERVER['HTTP_IDENTIFIER'];
// Initiate the cURL session
$req = curl_init(API);
curl_setopt($req, CURLOPT_POST, true);
curl_setopt($req, CURLOPT_POSTFIELDS, array(
    'token' => $token,
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
    // Redirect to the home page
    header('Location: ' . HOME_PAGE);
} else {
    // Redirect to the error page
    header('Location: ' . HOME_PAGE . '/error');
}