const MODAL_MODIFICATION_REQUEST = {
    new: 0,
    edit: 1,
    delete: 2
};

const MODAL_DESC = {
    tasks: "task",
    bm: "bookmark"
};

const DELETED_STR = (
    "4sh6$%v@^t%3%5MJRvY8z4@6AKa9v^feWS8kh4ZVuS6oor92Q*GfE9sJT9^%%N*#" +
    "%8&r$pg72*W$^s$2JwZNbB3^a@M%ZM4Q!K^!g2F2#4n82Ex#De87%5s4y3XpD6@a" +
    "469993898689426245893637863428973837635698458799956398935957437" +
    "9344389663942973698498493799688549564474939852432959652793322544" +
    "djeK^N^@4pP5BAzX3g8qc*k*2NYU&HdGU9osAg44B*bJ*552ag*Vsq6*LFp54*a%" +
    "idqvmoiavcznijrrcqxknysburfufvxosyhqxqnuismqjubwtughmgvksgppduoa" +
    "zg859r6323yj6e95p8nedpswpxffzht5ph5u7x7ksuo848rk869gyvqdm76u3gbe" +
    "GYKj96MDeL5anGh5Gg5Gauw6ZQc8QGce5zUzuMvEvTaa3HsMRNWGfNv9wQUdeDZu" + 
    "dTwaTRN5SajyaUp9dXLapNGspAgXSCRXKYgVrQS64ZjLBtaZAVQeWhDcTpdG6rV6" +
    "NcpfxRrqdhRrzX5ZtqY3pGzRzGpghJXtE9YFu5rg5SDTUVCdwR4QUWTCVyHKZJhx"
); // string that indicates that a bookmark or a task was deleted

const FAVICON_URL_PREFIX = 
    "https://s2.googleusercontent.com/s2/favicons?domain_url="; 
// URL of any website can be appended to this one to get image of its favicon

export {
    MODAL_MODIFICATION_REQUEST,
    MODAL_DESC,
    DELETED_STR,
    FAVICON_URL_PREFIX
};