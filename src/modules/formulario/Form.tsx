import { Box, Button, Grid2, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import MaskedInput from "react-text-mask";
import MontagemPdf from "../../components/MontagemPdf";
import Upload3x4 from "../../components/Upload3x4";
import { apartamentos, blocos, cotas, estadoCivil, orgaosExpedidores, parcelas } from "./commons";

export default function Form() {
    const [mostrarSegundoTitular, setMostrarSegundoTitular] = useState<boolean>(false);
    const [mostrarSegundoTelefone, setmostrarSegundoTelefone] = useState<boolean>(false);
    const { handleSubmit, control } = useForm({
        mode: "onSubmit",
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
    
    const phoneMask = ["(", /[1-9]/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];
    const cpfMask = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
    const dateMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];
    const cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/];

    const { fields, append, remove } = useFieldArray({
        control,
        name: "cotistas",
    });

    const onSubmit = (data) => {
        MontagemPdf(data)
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
