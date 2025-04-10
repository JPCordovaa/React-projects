import { useForm, Controller, useFieldArray } from "react-hook-form";
import MaskedInput from "react-text-mask";
import { TextField, Button, Grid2, MenuItem, Box, Typography } from "@mui/material";
import { useState } from "react";
import { apartamentos, blocos, cotas, estadoCivil, orgaosExpedidores, parcelas } from "./commons";
import Upload3x4 from "../../components/Upload3x4";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { jsPDFWithPlugin } from "./types";
import logo from '../../assets/associacaoMarina.png';

const phoneMask = ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
const cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

export default function Form() {
    const [mostrarSegundoTitular, setMostrarSegundoTitular] = useState<boolean>(false);
    const [mostrarSegundoTelefone, setmostrarSegundoTelefone] = useState<boolean>(false);
    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: "",
            nomeCompletoPrimeiro: "",
            nomeCompletoSegundo: "",
            dataNascimento: "",
            cpf: "",
            rg: "",
            rgOrgao: "",
            rgUf: "",
            primeiroTelefone: "",
            segundoTelefone: "",
            estadoCivil: "",
            endereco: "",
            bairro: "",
            cidade: "",
            pais: "",
            cep: "",
            foto: "",
            cotistas: [{ cota: "", bloco: "", apt: "" }],
            pagamento: null,
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "cotistas",
    });

    const onSubmit = (data) => {
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

    const onError = (errors) => {
        console.log("Erros no formulário:", errors);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)} style={{ marginTop: 20 }}>
            <Grid2 container gap={2} direction={'column'}>
                <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>E-mail</Typography>
                            <TextField
                                {...field}
                                label="Digite seu Email"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="nomeCompletoPrimeiro"
                    control={control}
                    rules={{ required: "Nome é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Nome Completo</Typography>
                            <TextField
                                {...field}
                                label="Digite seu Nome"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                {!mostrarSegundoTitular && (
                    <Grid2>
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setMostrarSegundoTitular(true)}
                        >
                            + Incluir segundo titular (Cônjuge)
                        </Button>
                    </Grid2>
                )}

                {mostrarSegundoTitular && (
                    <Grid2>
                        <Controller
                            name="nomeCompletoSegundo"
                            control={control}
                            render={({ field }) => (
                                <Grid2>
                                    <Typography>Nome Completo</Typography>
                                    <TextField
                                        {...field}
                                        label="Digite o nome do segundo titular"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                </Grid2>
                            )}
                        />

                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setMostrarSegundoTitular(false)}
                        >
                            - Excluir segundo titular
                        </Button>
                    </Grid2>
                )}

                <Controller
                    name="dataNascimento"
                    control={control}
                    rules={{
                        required: "Data de Nascimento é obrigatória",
                        validate: (value) =>
                            value?.replace(/\D/g, "").length === 8 || "Data incompleta",
                    }}
                    render={({ field, fieldState }) => (
                        <MaskedInput
                            {...field}
                            value={field.value || ""}
                            mask={dateMask}
                            guide={false}
                            render={(ref, props) => (
                                <Grid2>
                                    <Typography>Data de Nascimento</Typography>
                                    <TextField
                                        {...props}
                                        inputRef={ref}
                                        label="Digite sua data de nascimento dd/mm/yyyy"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                </Grid2>
                            )}
                        />
                    )}
                />

                <Controller
                    name="cpf"
                    control={control}
                    rules={{
                        required: "CPF é obrigatório",
                        validate: (value) =>
                            value?.replace(/\D/g, "").length === 11 || "CPF incompleto",
                    }}
                    render={({ field, fieldState }) => (
                        <MaskedInput
                            {...field}
                            value={field.value || ""}
                            mask={cpfMask}
                            guide={false}
                            render={(ref, props) => (
                                <Grid2>
                                    <Typography>CPF</Typography>
                                    <TextField
                                        {...props}
                                        inputRef={ref}
                                        label="Digite seu CPF"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                </Grid2>
                            )}
                        />
                    )}
                />

                <Controller
                    name="rg"
                    control={control}
                    rules={{ required: "RG é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>RG</Typography>
                            <TextField
                                {...field}
                                label="Digite seu RG"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="rgOrgao"
                    control={control}
                    rules={{ required: "Órgão Expedidor é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>RG (Órgão expedidor)</Typography>
                            <TextField
                                {...field}
                                label="Digite o órgão expedidor do RG"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="rgUf"
                    control={control}
                    rules={{ required: "UF do RG" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>RG (UF)</Typography>
                            <TextField
                                {...field}
                                select
                                label="Selecione a UF do RG"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {orgaosExpedidores.map((orgao) => (
                                    <MenuItem key={orgao.value} value={orgao.value}>
                                        {orgao.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid2>
                    )}
                />

                <Controller
                    name="primeiroTelefone"
                    control={control}
                    rules={{
                        required: "Telefone é obrigatório",
                        validate: (value) =>
                            value?.replace(/\D/g, "").length === 11 || "Telefone incompleto",
                    }}
                    render={({ field, fieldState }) => (
                        <MaskedInput
                            {...field}
                            value={field.value || ""}
                            mask={phoneMask}
                            guide={false}
                            render={(ref, props) => (
                                <Grid2>
                                    <Typography>Telefone com DDD</Typography>
                                    <TextField
                                        {...props}
                                        type="tel"
                                        inputRef={ref}
                                        label="Digite seu telefone "
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                </Grid2>
                            )}
                        />
                    )}
                />

                {!mostrarSegundoTelefone && (
                    <Grid2>
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setmostrarSegundoTelefone(true)}
                        >
                            + Incluir segundo telefone
                        </Button>
                    </Grid2>
                )}

                {mostrarSegundoTelefone && (
                    <Grid2>
                        <Controller
                            name="segundoTelefone"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value?.replace(/\D/g, "").length === 11 || "Telefone incompleto",
                            }}
                            render={({ field, fieldState }) => (
                                <MaskedInput
                                    {...field}
                                    value={field.value || ""}
                                    mask={phoneMask}
                                    guide={false}
                                    render={(ref, props) => (
                                        <Grid2>
                                            <Typography>Telefone com DDD</Typography>
                                            <TextField
                                                {...props}
                                                type="tel"
                                                inputRef={ref}
                                                label="Digite seu telefone"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                error={!!fieldState.error}
                                                helperText={fieldState.error?.message}
                                            />
                                        </Grid2>
                                    )}
                                />
                            )}
                        />
                        <Button
                            variant="text"
                            size="small"
                            onClick={() => setmostrarSegundoTelefone(false)}
                        >
                            - Excluir segundo telefone
                        </Button>
                    </Grid2>
                )}

                <Controller
                    name="estadoCivil"
                    control={control}
                    rules={{ required: "Estado civil é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Estado Civil</Typography>
                            <TextField
                                {...field}
                                select
                                label="Selecione o Estado civil"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {estadoCivil.map((orgao) => (
                                    <MenuItem key={orgao.value} value={orgao.value}>
                                        {orgao.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid2>
                    )}
                />

                <Controller
                    name="endereco"
                    control={control}
                    rules={{ required: "Endereço é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Endereço</Typography>
                            <TextField
                                {...field}
                                label="Digite seu Endereço"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="bairro"
                    control={control}
                    rules={{ required: "Bairro é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Bairro</Typography>
                            <TextField
                                {...field}
                                label="Digite seu Bairro"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="cidade"
                    control={control}
                    rules={{ required: "Cidade é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Cidade</Typography>
                            <TextField
                                {...field}
                                label="Digite seu Cidade"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="pais"
                    control={control}
                    rules={{ required: "País é obrigatório" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>País</Typography>
                            <TextField
                                {...field}
                                label="Digite seu País"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        </Grid2>
                    )}
                />

                <Controller
                    name="cep"
                    control={control}
                    rules={{
                        required: "CEP é obrigatório",
                        validate: (value) =>
                            value?.replace(/\D/g, "").length === 8 || "CEP incompleto",
                    }}
                    render={({ field, fieldState }) => (
                        <MaskedInput
                            {...field}
                            value={field.value || ""}
                            mask={cepMask}
                            guide={false}
                            render={(ref, props) => (
                                <Grid2>
                                    <Typography>CEP</Typography>
                                    <TextField
                                        {...props}
                                        inputRef={ref}
                                        label="Digite seu CEP"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                </Grid2>
                            )}
                        />
                    )}
                />

                <Controller
                    name="foto"
                    control={control}
                    rules={{ required: "A foto é obrigatória" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Foto 3x4</Typography>
                            <Upload3x4
                                onChange={field.onChange}
                                error={fieldState.error?.message} />
                        </Grid2>
                    )}
                />

                {fields.map((field, index) => (
                    <Grid2>
                        <Typography>Cota {index + 1}</Typography>
                        <Box key={field.id} display="flex" gap={2} alignItems="center">
                            <Controller
                                name={`cotistas.${index}.cota` as const}
                                control={control}
                                rules={{ required: "Número da cota é obrigatório" }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Selecione o número da cota"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        {cotas.map((orgao) => (
                                            <MenuItem key={orgao.value} value={orgao.value}>
                                                {orgao.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name={`cotistas.${index}.bloco` as const}
                                control={control}
                                rules={{ required: "Bloco é obrigatório" }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Selecione o Bloco"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        {blocos.map((orgao) => (
                                            <MenuItem key={orgao.value} value={orgao.value}>
                                                {orgao.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Controller
                                name={`cotistas.${index}.apt` as const}
                                control={control}
                                rules={{ required: "Apartamento é obrigatório" }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        select
                                        label="Selecione o Apartamento"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    >
                                        {apartamentos.map((orgao) => (
                                            <MenuItem key={orgao.value} value={orgao.value}>
                                                {orgao.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                            <Button
                                type="button"
                                color="error"
                                size="small"
                                onClick={() => remove(index)}
                                disabled={fields.length === 1}
                            >
                                Remover
                            </Button>
                        </Box>
                    </Grid2>
                ))}

                <Button
                    type="button"
                    variant="outlined"
                    onClick={() => append({ cota: "", bloco: "", apt: "" })}
                    disabled={fields.length === 5}
                >
                    + Adicionar Cota
                </Button>

                <Controller
                    name="pagamento"
                    control={control}
                    rules={{ required: "Defina a forma de pagamento" }}
                    render={({ field, fieldState }) => (
                        <Grid2>
                            <Typography>Parcelas de pagamento</Typography>
                            <TextField
                                {...field}
                                select
                                label="Selecione a forma de pagamento"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            >
                                {parcelas.map((orgao) => (
                                    <MenuItem key={orgao.value} value={orgao.value}>
                                        {orgao.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid2>
                    )}
                />
            </Grid2>
            <Button type="submit" variant="contained" color="primary" style={{ marginTop: "16px" }}>
                Enviar
            </Button>
        </form>
    );
};
