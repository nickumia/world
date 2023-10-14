import fernet from 'fernet';

var secret = new fernet.Secret("IS4KazwEAVpe4nMagfV54pxnuL9ufzsAsvQyjozvgTw=");

export default function decrypt(data){
	data = atob(data);
	return new fernet.Token({
		secret: secret,
		token: data,
	}).decode();
}
