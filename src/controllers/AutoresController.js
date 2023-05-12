import ErroValidacao from "../erros/ErroValidacao.js";
import autores from "../models/Autor.js";

class AutorController {

	static listarAutores = async (req, res, next) => {
		try {
			const autoresResultado = await autores.find();

			res.send(autoresResultado);
			
		} catch (err) {
			next(err);
		}
	};

	static listarAutorPorId = async (req, res, next) => {
		try {
			const id = req.params.id;

			const result = await autores.findById(id);

			if (result !== null) {
				res.send(result);
			} else {
				next(new NaoEncontrado("ID do autor não localizado!"));
			}

		} catch (err) {
			next(err);
		}
	};

	static cadastrarAutor = async (req, res, next) => {
		try {
			let autor = new autores(req.body);
			
			// if(!autor.nome)
			// 	throw new Error("O nome do(a) autor(a) é obrigatório!");

			const result = await autor.save();

			res.send(result.toJSON());

		} catch (err) {
			next(err);
		}
	};

	static atualizarAutor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const atualizacao = req.body;

			const result = await autores.findByIdAndUpdate(id, atualizacao);

			if (result !== null) {
				res.send(result);
			} else {
				next(new NaoEncontrado("ID do autor não localizado!"));
			}

		} catch (err) {
			next(err);
		}
	};

	static excluirAutor = async (req, res, next) => {
		try {
			const id = req.params.id;
			const result = await autores.findByIdAndDelete(id);

			if(!result)
				throw new ErroValidacao('ID inválido!');
			res.send(result);
			
		} catch (err) {
			next(err);
		}
	};
}

export default AutorController;