const exploreBooks = [
	{
		id: 1,
		prakar: "कादंबरी",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/kadambari.jpg?alt=media&token=0398adc3-545d-4790-98c4-d86ffe46439c",
	},
	{
		id: 2,
		prakar: "संकीर्ण",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/sankirna.jpg?alt=media&token=4045f190-0788-48bf-84f5-29e732c35067",
	},
	{
		id: 3,
		prakar: "कथासंग्रह",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/kathasangrah.jpg?alt=media&token=8f188c84-d050-4955-bb0e-a24865fd9179",
	},
	{
		id: 4,
		prakar: "चरित्र",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/charitra.jpg?alt=media&token=bf3a9af5-8a29-4681-ab68-8d499a49702e",
	},
	{
		id: 5,
		prakar: "आरोग्य",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/arogya.jpg?alt=media&token=b57e58d6-1883-49cf-aae4-3a554cd1717a",
	},
	{
		id: 6,
		prakar: "शास्त्रीय",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/shastriya.jpg?alt=media&token=644db6cf-3ffb-4ddf-9427-f6ef4bcc4983",
	},
	{
		id: 7,
		prakar: "धार्मिक",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/dharmik.jpg?alt=media&token=c18a5126-84aa-4bf6-8140-a0230eb4430e",
	},
	{
		id: 8,
		prakar: "समाजशास्त्र",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/samajshastra.jpg?alt=media&token=b1415fd7-7b43-4f13-a84e-a7f7499512e3",
	},
	{
		id: 9,
		prakar: "भौगोलिक",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/bhaugolik.jpg?alt=media&token=298a1612-2d2c-45b4-988a-acebae1fb435",
	},
	{
		id: 10,
		prakar: "बालविभाग",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/balvibhag.jpg?alt=media&token=b6d2c428-5be7-4efd-9f41-d7f6e65382f8",
	},
	{
		id: 11,
		prakar: "प्रवास",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/pravas.jpg?alt=media&token=a61a25d8-4231-4d32-acd6-d892c0dbcd96",
	},
	{
		id: 12,
		prakar: "राजा राम मोहनरॉय फाऊंडेशन",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/dengi.jpg?alt=media&token=96931670-4c52-4b9e-a544-f36d73512b7f",
	},
	{
		id: 13,
		prakar: "काव्यसंग्रह",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/kavya.jpg?alt=media&token=bb4a97f4-3ce5-4adf-9937-24f310ac7c04",
	},
	{
		id: 14,
		prakar: "इंग्रजी",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/ingraji.jpg?alt=media&token=c0499afb-b2e6-47e4-9a03-36447203c2ad",
	},
	{
		id: 15,
		prakar: "साहित्य",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/sahitya.jpg?alt=media&token=c0db98e4-a5e8-4804-9895-a18514882ab0",
	},
	{
		id: 16,
		prakar: "वाङ्मय",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/vanmay.jpg?alt=media&token=ec31c58c-a440-466f-9588-850bfed630de",
	},
	{
		id: 17,
		prakar: "कोष",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/kosh.jpg?alt=media&token=db808092-197d-4664-ac2e-6415ab9553cc",
	},
	{
		id: 18,
		prakar: "ज्योतिष",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/jyotish.jpg?alt=media&token=19663ed6-9599-4d34-945d-77f5897a365b",
	},
	{
		id: 19,
		prakar: "नाटक",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/natak.jpg?alt=media&token=1ddfac72-84c6-4f14-8d5e-991b5c04af71",
	},
	{
		id: 20,
		prakar: "संगीत",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/sangit.jpg?alt=media&token=4ce0b07a-996d-420f-9ca7-faf26014a26e",
	},
	{
		id: 21,
		prakar: "हिंदी",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/hindi.jpg?alt=media&token=aca5e2f7-8d54-43c7-9491-09b699a80aff",
	},
	{
		id: 22,
		prakar: "निबंध",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/nibandh.jpg?alt=media&token=c9dab569-7180-4637-a342-2a578ec2b53e",
	},
	{
		id: 23,
		prakar: "स्पर्धापरीक्षा",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/spardha.jpg?alt=media&token=f3f71dcb-4459-4571-b214-59b0b0a77ec8",
	},
	{
		id: 24,
		prakar: "इतिहास",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/itihas.jpeg?alt=media&token=5a24669f-7018-48e7-a48d-19b05c88214d",
	},
	{
		id: 25,
		prakar: "P. D. D. (दीक्षित देणगी)",
		img:
			"https://firebasestorage.googleapis.com/v0/b/devsavakhed.appspot.com/o/dengi.jpg?alt=media&token=96931670-4c52-4b9e-a544-f36d73512b7f",
	},
];

export default exploreBooks;
