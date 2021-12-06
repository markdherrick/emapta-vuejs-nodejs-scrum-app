import AgileService from "../services/agile.service";

export const agile = {
  state: {
    items: [],
  },
  getters: {
    getAll: function (state) {
      return state.items;
    },
  },
  mutations: {
    setItems: function (state, payload) {
      state.items = payload;
    },
    addItem: function (state, payload) {
      state.items.unshift(payload);
    },
    updateItem: function (state, payload) {
      var index = state.items.findIndex((item) => item.id == payload.id);
      state.items[index] = payload;
      state.items = [...state.items];
    },
    deleteItem: function (state, payload) {
      var index = state.items.findIndex((item) => item.id == payload);
      state.items.splice(index, 1);
    },
  },
  actions: {
    getItems: function (context) {
      AgileService.getItems().then((items) => {
        context.commit("setItems", items);
      });
    },
    addItem: function (context, payload) {
      AgileService.addItem(payload).then((response) => {
        if (response.status == 200)
          context.commit("addItem", {
            id: response.data.id,
            type: payload.type,
            description: payload.description,
          });
      });
    },
    updateItem: function (context, payload) {
      AgileService.editItem(payload).then((response) => {
        if (response.status == 200) {
          context.commit("updateItem", payload);
        }
      });
    },
    deleteItem: function (context, payload) {
      AgileService.deleteItem(payload).then((response) => {
        if (response.status == 200) context.commit("deleteItem", payload);
      });
    },
  },
};
