export default function requestJSON(url: string, post:{}):Promise<any> {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest() as any;
        //xhr.withCredentials = true;
        xhr.open('GET', url);
        //todo xhr.open('POST', url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject({
                    status: (this as any).status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: (this as any).status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
        //todo xhr.send(JSON.stringify(post));
    });
}
