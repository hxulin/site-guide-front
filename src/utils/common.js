/**
 * 解析 URL 链接
 *
 * @param str         URL 链接
 * @returns {string}  解析结果
 */
export function parseUri(str) {

  if (!parseUri || !parseUri.options) {
    parseUri.options = {
      strictMode: false,
      key: ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'],
      q: {
        name: 'queryKey',
        parser: /(?:^|&)([^&=]*)=?([^&]*)/g
      },
      parser: {
        strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
        loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
      }
    };
  }

  if (!str) {
    return '';
  }

  const o = parseUri.options;
  const m = o.parser[o.strictMode ? 'strict' : 'loose'].exec(str);
  const uri = {};

  let i = 14;
  while (i--) {
    uri[o.key[i]] = m[i] || '';
  }

  uri[o.q.name] = {};
  uri[o.key[12]].replace(o.q.parser, ($0, $1, $2) => {
    if ($1) {
      uri[o.q.name][$1] = $2;
    }
  });

  return uri;
}
