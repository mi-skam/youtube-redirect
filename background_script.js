let basicUrl = /^(https:\/\/(?:www|m)\.youtube\.com)\/?(\?.+?)?(#.+?)?$/;

/** redirect function
 *  returns an object with a property `redirectURL` set to the new URL
 */
function redirect(details) {
  if (details.method !== 'GET') return;

  console.log("Get Storage: " + sessionStorage.getItem('visited'));

  let match = details.url.match(basicUrl);
  let visited = sessionStorage.getItem('visited');

  if (match !== null && visited === null) {
    let redirectUrl = match[1] + '/feed/subscriptions' + (match[2] || '') + (match[3] || '');
    sessionStorage.setItem('visited', "yes");
    return {
      redirectUrl: redirectUrl
    };
  }
};

/** listener
 * passing the filter argument and "blocking"
 */
browser.webRequest.onBeforeRequest.addListener(
  redirect,
  { urls: ["<all_urls>"] },
  ["blocking"]
);

browser.sessions.onChanged.addListener(function () {
  sessionStorage.removeItem('visited');
});