const START_FROM = 7

export function getToken(jwt : string) {
    return jwt.substring(START_FROM)
}