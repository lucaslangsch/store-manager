const getDate = () => {
  const dataAtual = new Date();
  const ano = dataAtual.getFullYear();
  const mes = (`0${dataAtual.getMonth() + 1}`).slice(-2);
  const dia = (`0${dataAtual.getDate()}`).slice(-2);
  const dataFormatada = `${ano}-${mes}-${dia}`;
  return dataFormatada;
};

module.exports = getDate;