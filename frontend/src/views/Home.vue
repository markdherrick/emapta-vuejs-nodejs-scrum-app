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
            <v-icon @click="createItem()">mdi-plus</v-icon>
          </v-btn>
        </v-app-bar>

        <v-row class="px-2">
          <v-col cols="12" sm="12" class="text-left mt-2">
            <h5 class="h5 text-uppercase font-weight-bold">Values</h5>
            <template v-for="value in values">
              <v-card v-bind:key="value.id" class="my-2 py-1">
                <v-list class="transparent py-0">
                  <v-list-item class="pl-0">
                    <v-list-item-title>
                      <v-card-text class="text-left">
                        <div class="text-subtitle-2">
                          {{ value.description }}
                        </div>
                      </v-card-text>
                    </v-list-item-title>

                    <v-list-item-icon>
                      <v-icon @click="editItem(value.id)">mdi-pencil</v-icon>
                      <v-icon @click="showDeleteDialog(value.id)"
                        >mdi-close</v-icon
                      >
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </template>
          </v-col>

          <v-col cols="12" sm="12" class="text-left">
            <h5 class="h5 text-uppercase font-weight-bold">Principles</h5>
            <template v-for="principle in principles">
              <v-card v-bind:key="principle.id" class="my-2 py-1">
                <v-list class="transparent py-0">
                  <v-list-item class="pl-0">
                    <v-list-item-title>
                      <v-card-text class="text-left">
                        <div class="text-subtitle-2">
                          {{ principle.description }}
                        </div>
                      </v-card-text>
                    </v-list-item-title>

                    <v-list-item-icon>
                      <v-icon @click="editItem(principle.id)"
                        >mdi-pencil</v-icon
                      >
                      <v-icon @click="showDeleteDialog(principle.id)"
                        >mdi-close</v-icon
                      >
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="formDialog.show" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formDialog.title }}</span>
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
          <v-btn color="blue darken-1" text @click="closeDialog()">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="submitItem()"> Save </v-btn>
        </v-card-actions>
      </v-card>
      <v-overlay :value="overlay">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-dialog>

    <v-dialog v-model="deleteDialog.show" persistent max-width="320">
      <v-card class="text-left">
        <v-card-title class="text-h6"> Delete Item? </v-card-title>
        <v-card-text>Are you sure do you want to delete this item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="deleteDialog.show = false">
            No
          </v-btn>
          <v-btn color="red darken-1" text @click="deleteItem(deleteDialog.id)">
            Yes
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      deleteDialog: {
        id: null,
        show: false,
      },
      formDialog: {
        title: "",
        show: false,
      },
      values: [],
      principles: [],
      types: ["Principle", "Value"],
      item: {
        id: "",
        type: "Principle",
        description: "",
      },
      overlay: false,
    };
  },
  mounted() {
    this.getAgileValuesAndPrinciples();
  },
  methods: {
    getAgileValuesAndPrinciples() {
      this.values = [];
      this.principles = [];

      this.axios
        .get("http://localhost:8000/api/agile")
        .then((response) => {
          this.values = response.data.data.filter((obj) => {
            return obj.type === "value";
          });

          this.principles = response.data.data.filter((obj) => {
            return obj.type === "principle";
          });
        })
        .catch((error) => console.log(error));
    },
    createItem() {
      this.formDialog.show = true;
      this.formDialog.title = "Add New Item";
    },
    submitItem() {
      this.overlay = true;

      var data = {
        type: this.item.type.toLowerCase(),
        description: this.item.description,
      };

      var config = {};

      if (this.item.id) {
        config = {
          method: "patch",
          url: "http://localhost:8000/api/agile/" + this.item.id,
          data: data,
        };
      } else {
        config = {
          method: "post",
          url: "http://localhost:8000/api/agile",
          data: data,
        };
      }

      this.axios(config).then((response) => {
        console.log(response);
        this.item.type = "Principle";
        this.item.description = "";
        setTimeout(() => {
          this.overlay = false;
          this.formDialog.show = false;
        }, 1000);
        this.getAgileValuesAndPrinciples();
      });
    },
    editItem(id) {
      this.formDialog.show = true;
      this.formDialog.title = "Edit Item";

      this.axios
        .get("http://localhost:8000/api/agile/" + id)
        .then((response) => {
          this.item.type =
            response.data.data.type.charAt(0).toUpperCase() +
            response.data.data.type.slice(1);
          this.item.description = response.data.data.description;
          this.item.id = response.data.data.id;
        });
    },
    // submitEditItem(){
    //   var data = {
    //     type: this.item.type.toLowerCase(),
    //     description: this.item.description,
    //   };

    //   var config = {
    //     method: "patch",
    //     url: "http://localhost:8000/api/agile/" + id,
    //     data: data,
    //   };

    //   this.axios(config).then((response) => {
    //     console.log(response);
    //     this.item.type = "Principle";
    //     this.item.description = "";
    //     setTimeout(() => {
    //       this.overlay = false;
    //       this.formDialog.show = false;
    //     }, 1000);
    //     this.getAgileValuesAndPrinciples();
    //   });
    // },
    deleteItem(id) {
      this.axios
        .delete("http://localhost:8000/api/agile/" + id)
        .then((response) => {
          console.log(response);
          this.deleteDialog.show = false;
          this.getAgileValuesAndPrinciples();
        });
    },
    showDeleteDialog(id) {
      this.deleteDialog.id = id;
      this.deleteDialog.show = true;
    },
    closeDialog() {
      this.item.id = "";
      this.item.type = "Principle";
      this.item.description = "";
      this.formDialog.show = false;
    },
  },
};
</script>

<style scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0px !important;
}
.parent-class >>> .v-toolbar__content {
  padding: 0px !important;
}
</style>
