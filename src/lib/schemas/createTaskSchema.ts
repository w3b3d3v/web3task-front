import * as yup from 'yup';

export const createTaskSchema = yup
  .object({
    title: yup.string().required('Campo obrigatório.'),
    creatorRole: yup
      .string()
      .required('Campo obrigatório.')
      .test({
        test(value, ctx) {
          let role = Number(value);
          if (isNaN(role))
            return ctx.createError({ message: 'Número inválido para a role.' });
          return true;
        },
      }),
    reward: yup
      .string()
      .required('Campo obrigatório.')
      .test({
        test(value, ctx) {
          let role = Number(value);
          if (isNaN(role))
            return ctx.createError({ message: 'Valor inválido.' });
          return true;
        },
      }),
    authorizedRoles: yup
      .string()
      .required('Campo obrigatório.')
      .test({
        test(value, ctx) {
          let validation = true;
          let roles = value.split(',');
          roles.forEach((element) => {
            let role = Number(element);
            if (isNaN(role)) validation = false;
          });
          if (!validation)
            return ctx.createError({
              message: 'Número inválido para as roles.',
            });
          return validation;
        },
      }),
    assignee: yup.string().optional(),
    metadata: yup.string().url().required(),
    description: yup.string().required(),
    endDate: yup.object().required('Campo obrigatório.'),
  })
  .required();