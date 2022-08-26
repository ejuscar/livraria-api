import mongoose from "mongoose";

async function connect() {
	const uri =
		"mongodb+srv://root:umasenha123@cluster0.4nczmxr.mongodb.net/livraria?retryWrites=true&w=majority";

	return await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
}

export { connect };
