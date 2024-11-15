import { es } from '@formkit/i18n'
import { defaultConfig } from '@formkit/vue'
import { rootClasses } from '../formkit.theme'

const legends = ['checkbox_multi', 'radio_multi', 'repeater', 'transferlist']

function addAsteriskPlugin(node: any) {
  if (
    ['button', 'submit', 'hidden', 'group', 'list', 'meta'].includes(
      node.props.type,
    )
  )
    return

  node.on('created', () => {
    const legendOrLabel = legends.includes(
      `${node.props.type}${node.props.options ? '_multi' : ''}`,
    )
      ? 'legend'
      : 'label'

    if (node.props.definition.schemaMemoKey) {
      node.props.definition.schemaMemoKey += `${
        node.props.options ? '_multi' : ''
      }_add_asterisk`
    }

    const schemaFn = node.props.definition.schema
    node.props.definition.schema = (sectionsSchema: any = {}) => {
      sectionsSchema[legendOrLabel] = {
        children: [
          '$label',
          {
            $el: 'span',
            if: '$state.required',
            attrs: {
              style: 'color: #dc2626!important; margin-left: 2px;',
              class: '$classes.asterisk',
            },
            children: ['*'],
          },
        ],
      }

      return schemaFn(sectionsSchema)
    }
  })
}

export default defaultConfig({
  plugins: [addAsteriskPlugin],
  locales: { es },
  locale: 'es',
  config: {
    rootClasses,
  },
  messages: {
    es: {
      validation: {
        required: 'El campo es requerido',
      },
    },
  },
})
