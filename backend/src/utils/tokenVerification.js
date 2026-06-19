export const getVerificationToken = (req) => {
  const authHeader = req.headers.authorization || "";
  const bearerToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : "";

  const token =
    req.body?.token ||
    req.body?.verificationToken ||
    req.params?.token ||
    req.query?.token ||
    req.query?.verificationToken ||
    bearerToken;

  return typeof token === "string" ? decodeURIComponent(token).trim() : token;
};