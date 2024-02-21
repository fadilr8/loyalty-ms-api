const { object, string, boolean, date, number } = require('yup');

const loyaltyProgramSchema = object()
  .shape({
    name: string().required(),
    from: date().required(),
    to: date().required(),
    transactional: object().shape({
      min_transaction: number(),
      min_purchase: number(),
      first_purchase: boolean(),
    }),
    community: object()
      .shape({
        birthday_bonus: boolean(),
        activity: string(),
        get_member: boolean(),
      })
      .test(
        'exclusive-fields',
        'Only one community policy is allowed',
        function (value) {
          const { birthday_bonus, activity, get_member } = value;
          const count = [birthday_bonus, activity, get_member].filter(
            Boolean
          ).length;
          if (count > 1) {
            return this.createError({
              path: '',
              message: 'Only one community policy is allowed',
            });
          }
          return true;
        }
      )
      .test(
        'is-fixed',
        'Benefits must be fixed if community is provided',
        function (value) {
          const { is_fixed } = this.parent.benefits || {};
          console.log(!(value && Object.keys(value).length !== 0 && !is_fixed));
          return !(value && Object.keys(value).length !== 0 && !is_fixed);
        }
      ),
  })
  .test(
    'exclusive-fields',
    'Cannot have both transactional and community fields',
    function (value) {
      const { transactional, community } = value;
      if (
        transactional &&
        Object.keys(transactional).length !== 0 &&
        community &&
        Object.keys(community).length !== 0
      ) {
        return this.createError({
          path: '',
          message: 'Cannot have both transactional and community fields',
        });
      }
      return true;
    }
  );

module.exports = loyaltyProgramSchema;
