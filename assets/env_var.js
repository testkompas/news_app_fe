let url = "http://192.168.56.102:8100"

if (process.env.BASE_URL) {
    url = process.env.BASE_URL
}

export default url