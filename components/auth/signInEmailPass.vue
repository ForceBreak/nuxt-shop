<template>
  <v-layout wrap class="justify-center">
    <v-btn
      v-if="isRegister"
      class="mr-2"
      :color="mixin.theme_text_color"
      outlined
      @click="isRegister = !isRegister"
    >
      {{ $t('signIn') }}
    </v-btn>
    <v-btn
      v-if="!isRegister"
      class="ml-2"
      :color="mixin.theme_text_color"
      outlined
      @click="isRegister = !isRegister"
    >
      {{ $t('register') }}
    </v-btn>

    <v-flex xs12 class="mt-4">
      <v-form 
        v-model="validAuth"
        ref="authForm"
      >
        <v-text-field
          v-if="isRegister"
          v-model="formData.name"
          :color="mixin.theme_text_color"
          outlined
          placeholder="Name"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          :color="mixin.theme_text_color"
          outlined
          placeholder="Email"
          type="email"
          autocomplete="username"
        ></v-text-field>

        <v-text-field
          v-model="formData.password"
          :color="mixin.theme_text_color"
          outlined
          placeholder="Password"
          type="password"
          autocomplete="current-password"
        ></v-text-field>
        <v-btn
          v-if="isRegister"
          :color="mixin.theme_text_color"
          outlined
          @click="createUser()"
        >
          {{ $t('submit') }}
        </v-btn>

        <template v-else>
          <v-btn
            :color="mixin.theme_text_color"
            outlined
            @click="signInUser()"
          >
            {{ $t('submit') }}
          </v-btn>
          <v-btn
            :color="mixin.theme_text_color"
            outlined
            @click="signViaGoogle()"
          >
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </template>
        
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>

import Vue from 'vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as firebase from 'firebase'

export default {
  data(){
    return {
      isRegister: false,
      formData: {
        email: 'gbuecjd@ukr.net',
        password: 'qweqwe'
      },
      validAuth: false,
      formRules: {
        email: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
        ],
        password: [v => !!v || 'Password is required'],
        name: [v => !!v || 'Required'],
        membershipUntil: [v => !!v || 'Required']
      }
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      authUser: 'auth/authUser',
    })
  },
  methods: {
    ...mapActions({
      googleSignIn: 'auth/googleSignIn'
    }),
    ...mapMutations({
      SET_AUTH_USER: 'auth/SET_AUTH_USER'
    }),
    signViaGoogle(){
      this.googleSignIn(firebase)
    },
    async createUser() {
      try {
        let user = await this.$fireAuth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        )
        if(user){
          await user.user.updateProfile({
            displayName: this.formData.name,
            // photoURL: // some photo url
          })
          await this.SET_AUTH_USER(user.user)
        }
      } catch (e) {
        alert(e)
      }
    },
    async signInUser() {
      if(this.$refs.authForm.validate()){
        try {
          await this.$fireAuth.signInWithEmailAndPassword(
            this.formData.email,
            this.formData.password
          )
        } catch (e) {
          alert(e)
        }
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>