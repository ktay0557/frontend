import { rest } from "msw";

const baseURL = "https://purrfect-matches-06bb403f2068.herokuapp.com/"

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return res(ctx.json({
            "pk": 6,
            "username": "Kayleigh",
            "email": "",
            "first_name": "",
            "last_name": "",
            "profile_id": 6,
            "profile_image": "https://res.cloudinary.com/dzczvxofb/image/upload/v1/media/images/20627010_1933502126909321_4112228172050318181_o_ac3lgc",
            "is_staff_user": true
          })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
        return res(ctx.status(200));
    }),
];