import { shallowMount } from "@vue/test-utils";
import Home from "../../src/views/Home.vue";

describe("Home Page Unit Test:", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(Home, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
