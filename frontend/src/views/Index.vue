<template>
  <v-app id="inspire" class="pa-4">
    <v-main class="grey lighten-3 pb-4">
      <v-container>
        <v-app-bar color="transparent" elevation="0" class="px-0">
          <v-toolbar-title class="font-weight-bold text-uppercase"
            >Agile Software Development</v-toolbar-title
          >

          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon @click="openForm()">mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>

        <v-row class="px-2">
          <v-col cols="12" sm="12" class="text-left mt-2">
            <h5 class="h5 text-uppercase font-weight-bold">
              Values & Principles
            </h5>
            <template v-for="item in getAllItems">
              <item
                v-bind:key="item.id"
                :id="item.id"
                :type="item.type"
                :description="item.description"
                @editItem="updateItem"
                @deleteItem="removeItem"
              />
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <item-form ref="item_form"></item-form>
    <confirm-dialog ref="confirm_dialog"></confirm-dialog>
  </v-app>
</template>

<script>
import Item from "../components/Item.vue";
import ItemForm from "../components/ItemForm.vue";
import ConfirmDialog from "../components/ConfirmDialog.vue";

export default {
  components: {
    Item,
    ItemForm,
    ConfirmDialog,
  },
  computed: {
    getAllItems: function () {
      return this.$store.getters.getAll;
    },
  },
  created() {
    this.$store.dispatch("getItems");
  },
  data() {
    return {
      item_form_dialog: false,
      item_details: {},
    };
  },
  methods: {
    openForm() {
      this.item_form_dialog = true;
      this.$refs.item_form.showDialog({
        id: 0,
        description: "",
        type: "Principle",
      });
    },
    updateItem(item_details) {
      this.item_form_dialog = true;
      this.$refs.item_form.showDialog({
        id: item_details.id,
        description: item_details.description,
        type: item_details.type,
      });
    },
    removeItem(id) {
      this.$refs.confirm_dialog.showDialog(id);
    },
  },
};
</script>

<style></style>
