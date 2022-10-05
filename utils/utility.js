import jwt from 'jsonwebtoken'

export const generateToken = (id) => {
    return jwt.sign({ id }, "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2MzE1MDE3NCwiaWF0IjoxNjYzMTUwMTc0fQ.dFimEhoA_itoNQnQEmX3Idh-_52kdsmILTp2pQhwg3k", {
        expiresIn: '30d'
    })}
