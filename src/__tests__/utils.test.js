const utils = require('../components/utils.js');

it('Password is too short', () => {
    expect(utils.validatePassword('short')).toBe(false);
});

test('Password contains invalid characters', () => {
    expect(utils.validatePassword('=isInvalid')).toBe(false);
});

test('Password is well formatted', () => {
    expect(utils.validatePassword('BingoBongo11!')).toBe(true);
});

test('Valid Email', () => {
    expect(utils.validateEmail('Bingo@Bongo.com')).toBe(true);
});

test('Invalid Email', () => {
    expect(utils.validatePassword('Bingo.launchPad.com!')).toBe(false);
});

test('Username is too short', () => {
    expect(utils.validateUsername('me')).toBe(false);
});

test('Username too long', () => {
    expect(utils.validateUsername('MySuperLongUsernameIsUbcLaunchPad')).toBe(false);
});

test('Username contains invalid characters', () => {
    expect(utils.validateUsername('invalidBecause%%#')).toBe(false);
});

test('Username is Valid', () => {
    expect(utils.validateUsername('BingoBongo')).toBe(true);
});