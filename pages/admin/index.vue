<template>
  <v-layout>
    <v-flex xs12>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-btn
          color="success"
          class="mr-4"
          @click="validate"
        >
          Validate
        </v-btn>

      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

  export default {
    name: 'adminHomePage',
    layout: 'admin',
    data() {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
      }
    },
    methods: {
      validate () {
        if(this.$refs.form.validate()){
          this.$fireStore.collection('products').doc().set({ 
              name: 'First product', 
              description: 'First product description',
              price: 550 
            }
          )
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>