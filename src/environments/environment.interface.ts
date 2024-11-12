export interface Environment {
  production: boolean
  deploy: 'web' | 'android' | 'ios'
  // firebase: {
  //   apiKey: string
  //   authDomain: string
  //   projectId: string
  //   storageBucket: string
  //   messagingSenderId: string
  //   appId: string
  //   measurementId: string
  // }
}