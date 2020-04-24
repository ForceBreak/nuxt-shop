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
          :rules="formRules.name"
          :color="mixin.theme_text_color"
          outlined
          placeholder="Name"
        ></v-text-field>

        <v-text-field
          v-model="formData.email"
          :rules="formRules.email"
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
            @click="sigInGoogle()"
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
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    role:{
      type: String,
      default: 'user'
    }
  },
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
    ...mapMutations({
      SET_AUTH_USER: 'auth/SET_AUTH_USER',
      ADD_ROLE: 'auth/ADD_ROLE',
    }),
    async sigInGoogle(){
      let user = await this.signViaGoogle()
      
      let userFromDB = await this.$fireStore.collection('users')
        .doc(user.uid)
        .get()
        .then(response => {
          return response.data()
        })

      if(userFromDB){
        if(userFromDB.role === 'admin'){
          this.ADD_ROLE('admin')
          this.$router.push({name: `admin___${this.locale}`})
        }else if(userFromDB.role === 'user'){
          this.ADD_ROLE('user')
          this.$router.push({name: `index___${this.locale}`})
        }
      }else{
        this.createUserInDB(Object.assign(res, {role: this.role}))
          .then(() => this.$router.push({name: `${this.mixin_redirect_sign_in(this.role)}${this.locale}`}))
      }

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
          await this.createUserInDB(Object.assign(user.user, {role: this.role}))

          this.$router.push({name: `${this.mixin_redirect_sign_in(this.role)}${this.locale}`})
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
          .then(res => {
            this.$fireStore.collection('users')
            .doc(res.user.uid)
            .get()
            .then(response => {
              let data = response.data()
              if(data){
                if(data.role === 'admin'){
                  this.$router.push({name: `admin___${this.locale}`})
                }else if(data.role === 'user'){
                  this.$router.push({name: `index___${this.locale}`})
                }
              }
            })
          })
        } catch (e) {
          alert(e)
        }
      }
    },
  },
  mounted(){
    // console.log(this.$env)
    // if(this.role === 'admin'){
    //   this.formRules.email.push(v => v === this.$env.ADMIN_EMAIL || 'Not admin`s email')
    // }
  }
}
</script>

<style lang="scss" scoped>

</style>