import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useState, useContext } from "react";
import { TransactionsContext } from "../../TransactionsContext";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [type, setType] = useState("deposit");
  const [title, setTitle] = useState(" ");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(" ");

  const {createTransaction} = useContext(TransactionsContext)

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('')
    onRequestClose()
    
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar Modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          type="text"
          value={title}
          placeholder="Titulo"
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="number"
          value={amount}
          placeholder="Valor"
          onChange={(event) => setAmount(Number(event.target.value))}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            activeColor="green"
            isActive={type === "deposit"}
            onClick={() => {
              setType("deposit");
            }}
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            isActive={type === "withDraw"}
            activeColor="red"
            onClick={() => {
              setType("withDraw");
            }}
          >
            <img src={outcomeImg} alt="Saida" />
            <span>Saida</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
