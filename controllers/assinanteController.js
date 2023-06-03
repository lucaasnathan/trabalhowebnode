const assinanteModel = require('../models/assinanteModel');
const fs = require('fs');

class AssinanteController {
  async cadastrarAssinante(req, res) {
    try {
      const {
        codigo,
        nome,
        sobrenome,
        dataNascimento,
        telefone,
        endereco,
        cidade,
        estado,
        status
      } = req.body;

      let fotoPerfil;

      if (req.file) {
        fotoPerfil = fs.readFileSync(req.file.path);
        fs.unlinkSync(req.file.path);
      }

      const novoAssinante = new Assinante({
        codigo,
        nome,
        sobrenome,
        dataNascimento,
        telefone,
        endereco,
        cidade,
        estado,
        status,
        fotoPerfil
      });

      await novoAssinante.save();

      res.status(201).json(novoAssinante);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao cadastrar o assinante' });
    }
  }

  async editar(req, res) {
    try {
      const { id, nome, sobrenome, dataNascimento, telefone, endereco, cidade, estado, status } = req.body;
      const assinante = await Assinante.findById(id);

      if (!assinante) {
        return res.status(404).json({ error: 'Assinante não encontrado' });
      }

      assinante.nome = nome;
      assinante.sobrenome = sobrenome;
      assinante.dataNascimento = dataNascimento;
      assinante.telefone = telefone;
      assinante.endereco = endereco;
      assinante.cidade = cidade;
      assinante.estado = estado;
      assinante.status = status;

      if (req.file) {
        // Se uma nova foto de perfil foi enviada, atualize-a
        const fotoPerfilAntiga = assinante.fotoPerfil;

        if (fotoPerfilAntiga) {
          // Se já existia uma foto de perfil anterior, exclua-a do sistema de arquivos
          fs.unlinkSync(fotoPerfilAntiga);
        }

        assinante.fotoPerfil = req.file.path;
      }

      await assinante.save();

      res.status(200).json(assinante);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao editar o assinante' });
    }
  }

  async salvar(req, res) {
    try {

      let assinante = req.body;
      const max = await assinanteModel.findOne({}).sort({ codigo: -1 });
      assinante.id = max == null ? 1 : max.id + 1;

      if (req.file) {
        console.log(req.file);
        const imagem = req.file.path;
        assisante.imagem = imagem;
      }

      const resultado = await assinanteModel.create(assinante);
      res.status(201).json(resultado);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar Assinante' })
    }
  }

  async listar(req, res) {
    const resultado = await assinanteModel.find({});
    res.status(200).json(resultado);
  }

  async buscarPorid(req, res) {
    const id = req.params.id;
    const resultado = await assinanteModel.findOne({ 'id': id });
    res.status(200).json(resultado);
  }

  async buscarPorNome(req, res) {
    const nome = req.params.nome;
    const resultado = await assinanteModel.findOne({ 'nome': nome });
    res.status(200).json(resultado);
  }

  async buscarPorSobrenome(req, res) {
    const sobrenome = req.params.sobrenome;
    const resultado = await assinanteModel.find({ 'sobrenome': sobrenome });
    res.status(200).json(resultado);
  }

  async buscarPorCidade(req, res) {
    const cidade = req.params.cidade;
    const resultado = await assinanteModel.find({ 'cidade': cidade });
    res.status(200).json(resultado);
  }

  async buscarPorEstado(req, res) {
    const estado = req.params.estado;
    const resultado = await assinanteModel.find({ 'estado': estado });
    res.status(200).json(resultado);
  }

  async buscarPorStatus(req, res) {
    const status = req.params.status;
    const resultado = await assinanteModel.find({ 'status': status });
    res.status(200).json(resultado);
  }

  async atualizar(req, res) {
    const id = req.params.id;
    const _id = String((await assinante.findOne({ 'id': id }))._id);
    await assinanteModel.findByIdAndUpdate(String(_id), req.body);
    res.status(200).send();
  }

  async deletar(req, res) {
    const id = req.params.id;
    const _id = String((await assinanteModel.findOne({ 'id': id }))._id);
    await assinanteModel.findByIdAndRemove(String(_id));
    res.status(200).send();
  }

}

module.exports = new AssinanteController();