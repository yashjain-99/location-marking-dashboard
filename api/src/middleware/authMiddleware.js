import prisma from "../../prisma/client.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "No token provided or invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Fetch user details from Keycloak's UserInfo endpoint
    const userInfoResponse = await fetch(
      `${process.env.KEYCLOAK_URL}/realms/auth/protocol/openid-connect/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!userInfoResponse.ok) {
      throw new Error("Invalid token");
    }

    const userInfo = await userInfoResponse.json();

    const userId = userInfo.sub;
    const email = userInfo.email;

    await prisma.user.upsert({
      where: { id: userId },
      update: { email },
      create: { id: userId, email },
    });

    req.userId = userId;
    next();
  } catch (err) {
    console.error("Token validation or user sync error:", err);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
