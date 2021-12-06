<template>
  <v-card v-bind:key="id" class="my-2 py-1">
    <v-list class="transparent py-0">
      <v-list-item class="pl-0">
        <v-list-item-title>
          <v-card-text class="text-left">
            <div class="text-subtitle-1">
              {{ type.charAt(0).toUpperCase() + type.slice(1) }}
            </div>
            <div class="text-subtitle-2">
              {{ description }}
            </div>
          </v-card-text>
        </v-list-item-title>

        <v-list-item-icon>
          <v-icon @click="editItem(id, type, description)">mdi-pencil</v-icon>
          <v-icon @click="deleteItem(id)">mdi-close</v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    id: Number,
    type: String,
    description: String,
  },
  methods: {
    editItem(id, type, description) {
      this.$emit("editItem", { id: id, type: type, description: description });
    },
    deleteItem(id) {
      this.$emit("deleteItem", id);
    },
  },
};
</script>

<style></style>
