"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Materia } from "@/prisma/generated/prisma/enums";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createActivity } from "../query/action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const unities = [
  { label: "1 Unidade", value: "1un" },
  { label: "2 Unidade", value: "2un" },
  { label: "3 Unidade", value: "3un" },
  { label: "4 Unidade", value: "4un" },
] as const;

const subjects = [
  { label: "Matemática", value: Materia.MATEMATICA },
  { label: "Linguagens", value: Materia.LINGUAGENS },
  { label: "Ciências humanas", value: Materia.CIENCIASHUMANAS },
  { label: "Ciências da natureza", value: Materia.CIENCIASNATUREZA },
] as const;

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const MAX_FILE_SIZE = 2000000;
const formSchema = z.object({
  name: z
    .string()
    .min(5, "O nome da atividade precisa contar pelo menos 5 caracteres.")
    .max(64, "O nome da atividade so pode contar no máximo 64 caracteres."),
  description: z.string(),
  files: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Photo is required." })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 2MB.`,
    })
    .optional(),
  unity: z
    .string("Por favor selecione uma unidade.")
    .min(1, "Por favor selecione uma unidade."),
  materia: z
    .string("Por favor selecione uma materia.")
    .min(1, "Por favor selecione uma materia."),
});

export default function ActivityCreate() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      unity: "",
      materia: "",
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [isTransitionStarted, startTransition] = useTransition();
  const isMutating =
    form.formState.isSubmitting ||
    form.formState.isLoading ||
    isTransitionStarted;
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await createActivity(
      data.name,
      data.description,
      data.unity,
      Materia[data.materia as keyof typeof Materia],
      data.files
    );
    startTransition(router.refresh);
    setOpenDialog(false);
    toast.success("Você criou uma atividade com sucesso!");
    form.reset();
  }

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <form>
          <DialogTrigger asChild>
            <div
              className="flex justify-end py-10 px-10"
              aria-controls="dialog_trigger"
            >
              <Button
                type="button"
                variant="outline"
                className="bg-primary text-secondary rounded-full h-10 w-10"
              >
                <PlusIcon />
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Atividades</DialogTitle>
              <DialogDescription>
                Insira as informações da atividade abaixo.
              </DialogDescription>
            </DialogHeader>

            <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Nome
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Atividade de relatividade"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="description"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-description">
                        Descrição
                      </FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          {...field}
                          id="form-rhf-demo-description"
                          placeholder="Este é um trabalho que demonstra a complexidade da física."
                          rows={6}
                          className="min-h-24 resize-none"
                          maxLength={300}
                          aria-invalid={fieldState.invalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.value.length}/300 caracteres
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription className="hidden md:block">
                        Esta descrição é importante para que os professores
                        entendam o trabalho.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <div className="flex md:flex-col">
                  <Controller
                    name="unity"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="responsive"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <FieldLabel htmlFor="form-rhf-select-language">
                            Unidade
                          </FieldLabel>
                          <FieldDescription>
                            Selecione a unidade da atividade.
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="form-rhf-select-language"
                            aria-invalid={fieldState.invalid}
                            className="min-w-30"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectSeparator />
                            {unities.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}
                              >
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                  <Controller
                    name="materia"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="responsive"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldContent>
                          <FieldLabel htmlFor="form-rhf-select-language">
                            Materia
                          </FieldLabel>
                          <FieldDescription>
                            Selecione a materia da atividade.
                          </FieldDescription>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </FieldContent>
                        <Select
                          name={field.name}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="form-rhf-select-language"
                            aria-invalid={fieldState.invalid}
                            className="min-w-30"
                          >
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent position="item-aligned">
                            <SelectSeparator />
                            {subjects.map((language) => (
                              <SelectItem
                                key={language.value}
                                value={language.value}
                              >
                                {language.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="files"
                  control={form.control}
                  render={({
                    fieldState,
                    field: { value, onChange, ...fieldProps },
                  }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="form-rhf-demo-title">
                        Nome
                      </FieldLabel>
                      <Input
                        {...fieldProps}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Atividade de relatividade"
                        autoComplete="off"
                        type="file"
                        multiple
                        onChange={(event) => onChange(event.target.files)}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <DialogFooter className="pt-5">
                <Button
                  type="submit"
                  form="form-rhf-demo"
                  disabled={isMutating}
                  aria-disabled={isMutating}
                >
                  {isMutating ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <p> Criar </p>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
}
