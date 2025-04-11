import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { jsPDFWithPlugin } from "../modules/formulario/types";
import logo from '../assets/associacaoMarina.png';

const MontagemPdf = (data) => {
        console.log("Dados do formulário:", data);
        const doc = new jsPDF() as jsPDFWithPlugin;;
        const isPreenchido = (valor: string | undefined) => !!valor && valor.trim() !== "";
        const checkbox = (preenchido: boolean) => (preenchido ? "(x)" : "( )");
        const linhaX = 60;
        const linhaLargura = 130;
        function labelCell(label: string, value?: string | null, colSpan = 1) {
            return {
                content: `${label}\n${value ?? ""}`,
                colSpan,
            };
        };
        const opcaoPagamento = (valor: number, comparado: number) =>
            valor === comparado ? "(x)" : "( )";

        doc.setFontSize(16);
        doc.text("Ficha de Cadastro", 80, 40);

        doc.setFontSize(12);
        doc.text("Dados Pessoais", 14, 55);

        const titular1Y = 70;
        doc.text(`${checkbox(isPreenchido(data.nomeCompletoPrimeiro))} 1º Titular`, 14, titular1Y);
        doc.line(linhaX, titular1Y + 1, linhaX + linhaLargura, titular1Y + 1);
        if (data.nomeCompletoPrimeiro) {
            doc.text(data.nomeCompletoPrimeiro, linhaX + 2, titular1Y);
        }

        const titular2Y = 78;
        doc.text(`${checkbox(isPreenchido(data.nomeCompletoSegundo))} 2º Titular`, 14, titular2Y);
        doc.line(linhaX, titular2Y + 1, linhaX + linhaLargura, titular2Y + 1);
        if (data.nomeCompletoSegundo) {
            doc.text(data.nomeCompletoSegundo, linhaX + 2, titular2Y);
        }

        autoTable(doc, {
            willDrawCell: function (data) {
                if (
                    data.section === 'body' &&
                    data.cell.raw &&
                    typeof (data.cell.raw as any).content === 'string'
                ) {
                    const rawContent = (data.cell.raw as { content: string }).content;
                    const partes = rawContent.split("\n");
                    const label = partes[0]?.trim();
                    const valor = partes.slice(1).join("\n").trim();
                    const x = data.cell.x + 2;
                    const y = data.cell.y + 4;

                    if (label) {
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'bold');
                        doc.text(label, x, y);
                    }

                    if (valor) {
                        doc.setFontSize(10);
                        doc.setFont(undefined, 'normal');
                        doc.text(valor, x, y + 5);
                    }
                }
            },
            startY: 82,
            body: [
                [
                    labelCell("DATA DE NASCIMENTO", data.dataNascimento),
                    labelCell("CPF", data.cpf),
                    labelCell("TELEFONE", data.primeiroTelefone),
                    labelCell("TELEFONE 2", data.segundoTelefone),
                ],
                [
                    labelCell("EMAIL", data.email, 3),
                    labelCell("ESTADO CIVIL", data.estadoCivil),
                ],
                [
                    labelCell("ENDEREÇO", data.endereco, 4),
                ],
                [
                    labelCell("CIDADE", data.cidade),
                    labelCell("UF", data.rgUf),
                    labelCell("PAÍS", data.pais),
                    labelCell("CEP", data.cep),
                ],
            ],
            theme: "grid",
            styles: {
                fontSize: 10,
                halign: "left",
                valign: "top",
            },
        });

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 5,
            head: [["Cota", "Bloco", "Apartamento"]],
            body: data.cotistas.map((cotista) => [
                cotista.cota,
                cotista.bloco,
                cotista.apt,
            ]),
            theme: "striped",
            styles: { fontSize: 10 },
        });
        const lastLine = doc.lastAutoTable.finalY;

        doc.setLineWidth(0.2);
        doc.line(14, lastLine + 5, 195, lastLine + 5);
        doc.text("Parcelamento", 14, lastLine + 10);
        doc.setFontSize(8);
        doc.text(`${opcaoPagamento(data.pagamento, 1)} 1x de R$ 540,00`, 14, lastLine + 15);
        doc.text(`${opcaoPagamento(data.pagamento, 2)} 2x de R$ 270,00`, 44, lastLine + 15);
        doc.text(`${opcaoPagamento(data.pagamento, 3)} 4x de R$ 135,00`, 74, lastLine + 15);
        doc.text(`${opcaoPagamento(data.pagamento, 4)} 8x de R$67,50`, 104, lastLine + 15);
        doc.text(`${opcaoPagamento(data.pagamento, 5)} 12x de R$ 45,00`, 134, lastLine + 15);
        doc.text(`${opcaoPagamento(data.pagamento, 6)} Filiados da cooperativa`, 164, lastLine + 15);
        doc.line(14, lastLine + 20, 195, lastLine + 20);

        doc.text(` Declara que todas as informações colocadas nesta ficha são verdadeiras;

    - Declara que leu e está de acordo com o inteiro teor do estatuto social da ASSOCIAÇÃO CIVIL DE PROPRIETÁRIOS, PROMITENTES
    COMPRADORES E CESSIONÁRIOS DE IMÓVEIS EM REGIME DE MUTIPROPRIEDADE DO CONDOMÍNIO MARINA & FLAT, bem como os direitos e deveres 
    impostos a todos os membros desta instituição; 
    
    - Aceita o propósito desta Associação, unindo-se de forma voluntária, e dando autonomia para que esta te inclua em solicitações coletivas 
    relacionadas aos interesses dos cotistas proprietários; 
    
    - Declara ciência dos valores associativos e se compromete a honrar, em dia, com todas as parcelas devidas, sob pena de justo desligamento
    desta Associação. 
    
    - Aceita que seu cadastro passará por análise antes de ser aprovado, e que a falta de documentos cancelará automaticamente o pedido
    de inscrição; 
    
    - Conta para fazer pagamento da Associação, Caixa Economica Federal, Agencia Nº          Conta:    `, 14, lastLine + 30)

    doc.line(30, 280, 90, 280);
    doc.line(120, 280, 180, 280);
    doc.text("Data de inscrição", 50, 285);
    doc.text("Assinatura", 145, 285);

        const image = new Image();
        image.src = logo;
        image.onload = () => {
            doc.addImage(image, 'PNG', 14, 15, 30, 30);
            doc.save("arquivo.pdf");
        };

        if (data.foto instanceof File) {
            const reader = new FileReader();
            reader.onload = () => {
                const imageData = reader.result as string;

                doc.addImage(imageData, "PNG", 150, 10, 40, 53);

                doc.save("ficha-cadastro.pdf");
            };
            reader.readAsDataURL(data.foto);
        } else {
            doc.save("ficha-cadastro.pdf");
        }
    };

    export default MontagemPdf;