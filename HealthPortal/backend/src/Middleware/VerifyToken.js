import jwt from "jsonwebtoken";
import { ROLES } from "../constants/roleconstants.js";

export function verifyToken(request, response, next) {
    try {
        const header = request.headers["authorization"];
        if (!header) {
            return response.status(401).send({ message: "Authorization header missing" });
        }

        // Expect header as "Bearer <token>"
        const token = header.split(" ")[1];
        if (!token) {
            return response.status(401).send({ message: "Token not provided" });
        }

        // Verify the token using the same secret as in LoginController
        jwt.verify(token, "user1234", (error, decoded) => {
            if (error) {
                return response.status(401).send({ message: "Invalid or expired token" });
            }

            // Attach token data to request object
            request.user = decoded;

            // You can optionally check roles here
            if (decoded.role === ROLES.ADMIN || decoded.role === ROLES.CUSTOMER) {
                next();
            } else {
                return response.status(403).send({ message: "Unauthorized role" });
            }
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Something went wrong in token verification" });
    }
}
