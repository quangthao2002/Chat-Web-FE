import axiosClient from "./axiosClient"

const authServices = {
  verifyEmail: ({ token }: { token: string }) => {
    return axiosClient.get(`/auth/verify-email?token=${token}`)
  },
}

export default authServices
