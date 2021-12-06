<template>
  <v-dialog v-model="show" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text class="pb-0">
        <v-container fluid>
          <v-row>
            <v-col cols="12" class="px-0">
              <v-select
                :items="types"
                v-model="item.type"
                label="Type"
              ></v-select>
            </v-col>

            <v-col cols="12" class="px-0">
              <v-textarea
                v-model="item.description"
                label="Description"
                auto-grow
                required
                value=""
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="closeDialog()"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="saveItem()"> Save </v-btn>
      </v-card-actions>
    </v-card>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-dialog>
</template>

<script>
export default {
  props: {
    item_details: Object,
  },
  data() {
    return {
      show: false,
      title: "",
      types: ["Principle", "Value"],
      overlay: false,
      item: {
        id: "",
        type: "Principle",
        description: "",
      },
    };
  },
  methods: {
    showDialog(item_details) {
      this.show = true;

      if (item_details.id == 0) {
        this.title = "Add New Item";
      } else {
        this.title = "Edit Item";
      }

      this.item.id = item_details.id;
      this.item.type =
        item_details.type.charAt(0).toUpperCase() + item_details.type.slice(1);
      this.item.description = item_details.description;
    },
    closeDialog() {
      this.show = false;
    },
    saveItem() {
      if (this.item.id == 0) {
        this.$store.dispatch("addItem", this.item);
      } else {
        this.$store.dispatch("updateItem", this.item);
      }
      this.show = false;
    },
  },
};
</script>

<style></style>
