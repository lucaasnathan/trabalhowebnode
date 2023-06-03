const mongoose = require('mongoose');

const assinanteSchema = new mongoose.Schema({
      id: Number,
      nome: String,
      sobrenome: String,
      data_Nascimento: Date,
      telefone: String,
      endereco: String,
      cidade: String,
      estado: String,
      status: Boolean,
      imagem: Buffer

});


module.exports = mongoose.model('assinantes', assinanteSchema);