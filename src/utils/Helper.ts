import Cookies from "universal-cookie";

export function classNames(classValue: string, ...classes: string[]): string {
  return classValue + ' ' + classes.join(' ');
}

export function getPercentage(data: string, oldValue: number) {
  if (data === '') return 0;
  let number = parseInt(data);
  if (number > 0 && number <= 100) {
    return number;
  }
  return oldValue;
}

const cookies = new Cookies();

export function IsAdmin():boolean{
  return cookies.get("IsAdmin") as boolean;
}

export function wordToSentence(data: string) {
  const result = data.match(/[A-Z][a-z]+|[0-9]+/g);
  if (result == null) {
    return data;
  }
  return result.join(' ');
}

export function hasLicenseLink(data: string) {
  if (data == 'CC_BY') {
    return 'https://creativecommons.org/licenses/by/4.0/';
  }
  if (data == 'CC_BY_SA') {
    return 'https://creativecommons.org/licenses/by-sa/4.0/';
  }
  if (data == 'CC_BY_NC') {
    return 'https://creativecommons.org/licenses/by-nc/4.0/';
  }
  if (data == 'CC_BY_NC_SA') {
    return 'https://creativecommons.org/licenses/by-nc-sa/4.0/';
  }
  return 'NA';
}

export function enableLinks(data: string) {
  let p1 = data.split(' ');
  let wordsWithHttp = p1.filter((x) => x.startsWith('http'));
  let result = data;
  wordsWithHttp.map(
    (value) =>
      (result = result.replace(
        value,
        '<a href=\'value\' target="_blank" rel="noopener noreferrer">value</a>'
      ))
  );
  return result;
}
