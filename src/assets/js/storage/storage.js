/**
 * 浏览器数据库存储
 * @param {int} type 存储方式
 */
class Storage {
    constructor(type) {
        //type 0代表长期 1代表短期
        this.type = type;
    }
    /**
     *
     * @param {string} key 键
     * @param {*} value 值
     * @param {string} type 值的类型能直接存的就不用填
     *
     * @example set("bus", 1900)
     * @example set("car", {"bus":1900}, "JSON")
     */
    set(key, value, type) {
        if (type == null) {
            if (this.type === 0) {
                window.localStorage.setItem(key, value);
            } else {
                window.sessionStorage.setItem(key, value);
            }
        } else if (type === "JSON") {
            if (this.type === 0) {
                window.localStorage.setItem(
                    key,
                    JSON.stringify(value).toString()
                );
            } else {
                window.sessionStorage.setItem(
                    key,
                    JSON.stringify(value).toString()
                );
            }
        }
    }
    /**
     *
     * @param {string} key 键
     * @param {*} type 值的类型能直接存的就不用填
     * @returns 值
     *
     * @example get("bus")
     * @example get("car", "JSON")
     */
    get(key, type) {
        if (type == null) {
            if (this.type === 0) {
                return window.localStorage.getItem(key);
            } else {
                return window.sessionStorage.getItem(key);
            }
        } else if (type === "JSON") {
            if (this.type === 0) {
                return JSON.parse(window.localStorage.getItem(key));
            } else {
                return JSON.parse(window.sessionStorage.getItem(key));
            }
        }
    }
    /**
     *
     * @param {string} key 键
     * @param {*} type 值的类型能直接存的就不用填
     * @returns 值
     *
     * @example delete("bus")
     * @example delete("car", "JSON")
     */
    delete(key, type) {
        if (type == null) {
            if (this.type === 0) {
                return window.localStorage.removeItem(key);
            } else {
                return window.sessionStorage.removeItem(key);
            }
        } else if (type === "JSON") {
            if (this.type === 0) {
                return JSON.parse(window.localStorage.removeItem(key));
            } else {
                return JSON.parse(window.sessionStorage.removeItem(key));
            }
        }
    }
}

export default Storage;
