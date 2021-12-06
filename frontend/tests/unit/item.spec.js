import { mount, createLocalVue } from "@vue/test-utils";
import Vuetify from "vuetify";
import Item from "@/components/Item.vue";

describe("Item.vue", () => {
  let localVue;
  let vuetify;
  let wrapper;
  beforeEach(() => {
    localVue = createLocalVue(); // because of vuetify, we should use a localVue instance
    vuetify = new Vuetify();
    wrapper = mount(Item, {
      localVue,
      vuetify,
      attachToDocument: true,
      propsData: {
        id: 1,
        type: "value",
        description: "Agile 1 value testing.",
      },
    });
  });

  it("should have properties id, type, description", () => {
    expect(wrapper.props("id")).toBe(1);
    expect(wrapper.props("type")).toBe("value");
    expect(wrapper.props("description")).toBe("Agile 1 value testing.");
  });

  it("should render an edit button and delete", () => {
    expect(wrapper.find('[data-button-name="edit-button"]').exists()).toBe(
      true
    );
    expect(wrapper.find('[data-button-name="delete-button"]').exists()).toBe(
      true
    );
  });
});
