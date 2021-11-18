let mongoose = require('mongoose')
let Schema = mongoose.Schema
const { DateTime } = require('luxon')

let AuthorSchema = new Schema(
    {
        first_name: {type:String, required: true, maxLength:100},
        family_name: { type: String, required: true, maxLength: 100 },
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
)

AuthorSchema
    .virtual('name')
    .get(() => this.family_name + ', ' + this.first_name)

AuthorSchema.virtual('lifespan').get(() => {
    let lifetime_string = ''

    if (this.date_of_birth) {
    lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(
		DateTime.DATE_MED
        )
    }
    lifetime_string += ' - '

      if (this.date_of_death) {
			lifetime_string += DateTime.fromJSDate(
				this.date_of_death
			).toLocaleString(DateTime.DATE_MED)
		}
		return lifetime_string
})

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id
})

AuthorSchema.virtual('name').get(function () {
    return this.family_name + ', ' + this.first_name
})

AuthorSchema.virtual('formatted_birth').get(function () {
    return this.date_of_birth
        ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
            : ''
})

AuthorSchema.virtual('formatted_death').get(function () {
    return this.date_of_death
        ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
            : ''
})

AuthorSchema.virtual('formatted_lifespan').get(function () {
    return this.formatted_birth + ' - ' + this.formatted_death
})
module.exports = mongoose.model('Author', AuthorSchema)