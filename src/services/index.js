// import axios from 'axios';

// const http = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//     }
// });

// const requestInterceptor = (config) => {
//     config.url = "".concat(config.url, "/").concat(API_VERSION);
//     return config
// };

// http.interceptors.request.use(requestInterceptor);

// http.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         let { response } = error;
//         if (response) {
//             noty('error');
//         }
//         throw error;
//     });

// export { http };

// if (IS_DEVELOPMENT) {
//     window.http = http;
// }
