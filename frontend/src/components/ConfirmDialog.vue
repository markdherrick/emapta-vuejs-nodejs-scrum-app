<template>
  <v-dialog v-model="show" persistent max-width="320">
    <v-card class="text-left">
      <v-card-title class="text-h6"> Delete Item? </v-card-title>
      <v-card-text>Are you sure do you want to delete this item?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey darken-1" text @click="show = false"> No </v-btn>
        <v-btn color="red darken-1" text @click="deleteItem(id)"> Yes </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      id: 0,
    };
  },
  methods: {
    showDialog(id) {
      this.id = id;
      this.show = true;
    },
    deleteItem(id) {
      this.$store.dispatch("deleteItem", id);
      this.show = false;
    },
  },
};
</script>

<style></style>
