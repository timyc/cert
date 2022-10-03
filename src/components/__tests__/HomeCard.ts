import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import HomeCard from "../HomeCard.vue";

describe("HomeCard", () => {
  it("renders properly", () => {
    const wrapper = mount(HomeCard, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
