import * as fs from "fs";

let isDevelopmentMode = process.env.NODE_ENV != "production";

export default {
    DEVELOPMENT_MODE: isDevelopmentMode,
    IS_TESTNET: process.env.IS_TESTNET == "true",

    // Vite/Vike is persistently giving a "readFileSync is not a function" error, and I've spent 10+ hours debugging it.
    // This is preventing us from properly using Docker secrets for these highly sensitive values.
    // For now (dev instance), using hard-coded values for hackathon demo.
    // Obviously can/would never use this in production.
    SUMSUB_APP_TOKEN: "", // sandbox token
    SUMSUB_SECRET_KEY: "", // sandbox key
    DB_ENCRYPTION_KEY: "NrGa2y1mzL8ifZpjReLaIhJT8VrB3WED8QD0NTXnaR5oitee6uSvU9wTAEBG5fqO",
    DB_CONNECTION_STRING: isDevelopmentMode
        ? "mongodb://hashauth:devdbpassword123@db:27017/hashauth-dev?authSource=admin"
        : "mongodb://hashauth:devdbpassword123@db:27017/hashauth-production?authSource=admin",
    JWT_PRIVATE_KEY: `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDkndieknAIAwGW
o40P3r6mU7q36ySWHipeD7KKh/y8AUZjPHNpJ9GxSuOi67JiCcl/mxsirKx1Te1Y
HfS/9H6zzkAkPp/GRVfVu97eoihLzXAjZO18y5zbyjNVvSm0tWTf4dw34pTwS1a1
EAD/Lpev6CkZuvX5DCh0brxKu1LVmTxNQ4tRP480vYxOsLl3igWrNW1xT+R6zYUu
x6re5QqjF+6qBxqwi5Q4sv2fcDks8D8+95AYpl1q14gDI8ZbRFB7yneZqsyCmPv0
BEYz2sM2MXBXKXwPp1FkJLs5PZ+KWTxxenERa8VTCkHa6usq5DHn3ovDlONfDcRS
976p5bJjAgMBAAECggEAbBTh7enuVCNTs2uEC54zhP/ttPjStbPyNMD4GD09M4bo
x46zQ2IjZU2x+/qxPV9CJ3VlaUm4SMb8MB4NcVi+M/SM53XB5KMw6OemcJu6MEgi
PWGAU3ERqelYxq6lEn11gNDPY45X+pirl/NGfV4CMZQxJix5EHJ6h704gJ46BafE
7j48+rU4gwyk70fThpoq5Y2pRYY8QGlM2d9brp3kOCt2bvywELjrV3x5QPhswvH8
XtPa98ZnMbqDp1FJbl/G51Vq9sEN5bJmZLTXZpO1Ch/I+cGUZWiLTV+MdH/n3NkR
sadyOVWhcY6ixSbhbnsAmU4TuUXeA6bR0cKqtd/zyQKBgQD7G6dYLoFLSNe7sh0r
l+dKR9gHS/i/PBsSYY0EmPCTOqL1+Snol2ysYIWGRk2Nb3BFrX7Yv2WM5VjTF6Hy
TMOC5ftWdlItC4ggObfANgedVnAYq2rlIjuBg7W7dz1t1h27DRAd9KhbSMytO2uF
drolQmczH9im2jg3Unr7fXTlmQKBgQDpEgV4TixXFHPldVxPEBwlDhEb5/ZweTHi
8UjlzbTjXWeE8UTZDNjSqhZEcZDpLUW/J3h2Nd/Xp67sXMpFhQOYdfVywvKoo3QW
+QvW/1LTqffTBmQ503tMWwIpxrL5bSJv0O7wLOFmiQCpsJ/eOa6biOr91ysal9Kc
DjHkcBvdWwKBgA0Wq+pUwjiCW3xVFGApUsz0YbY/p3+QSnjyzL7omeGStNvNWPne
qrNxdIRDNdehb2CyYmI517k4WyDlonNWvPodsrQXBsGCUF4dpA5IwqzYzI78oF3B
IwjlLJvQ40rOVk5hp+1nyz621LRS3I/gWGOIyohHqKtJxJRdoDtrlqRBAoGAZ6RK
6Gei0gpXS0c4CDR6v4OU2hr5fKR4KZnwN7iU4rJLcVO0sOxEktFt23vA29/07v8H
U1G7u3NmltbgX6+5nJd/0Uudip485mZS/IVHeLZRbPafpRNE9fxWZutj9QSx1pVL
W2Qpy2XK9KqFPNXbrnBhRwXitg2jax/o0dOEoJcCgYEAum/67HLEWWU1vSiIXOng
m28Z1BvCob7KPbUHIO5NGwy+SRGQH3w42d515wV744dzwwY6BFlbf73kJXj56Z48
qDG0gxxwa/ZmK2ytX7gkAmQnwGI/7SxgeMZRWQy6lTgXYiIaza632ohkU02tNrDM
aptVQDVIqagEM0o2wkHMuCM=
-----END PRIVATE KEY-----`,
    JWT_PUBLIC_KEY: `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5J3YnpJwCAMBlqOND96+
plO6t+sklh4qXg+yiof8vAFGYzxzaSfRsUrjouuyYgnJf5sbIqysdU3tWB30v/R+
s85AJD6fxkVX1bve3qIoS81wI2TtfMuc28ozVb0ptLVk3+HcN+KU8EtWtRAA/y6X
r+gpGbr1+QwodG68SrtS1Zk8TUOLUT+PNL2MTrC5d4oFqzVtcU/kes2FLseq3uUK
oxfuqgcasIuUOLL9n3A5LPA/PveQGKZdateIAyPGW0RQe8p3marMgpj79ARGM9rD
NjFwVyl8D6dRZCS7OT2filk8cXpxEWvFUwpB2urrKuQx596Lw5TjXw3EUve+qeWy
YwIDAQAB
-----END PUBLIC KEY-----`,
};
