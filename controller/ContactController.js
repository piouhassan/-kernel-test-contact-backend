const Contact = require('../models/Contact')

const list = async (req,res) => {
    const contacts = await Contact.find()
    return res.status(200).json({
         succeed : true,
         list : contacts
    })
}

const store = async (req,res) => {

    const exist = await Contact.findOne({phone : req.body.phone})
    const existEmail = await Contact.findOne({email : req.body.email})

    if (exist){
        res.status(200).json({
            succeed : false,
            message : "Un contact avec le même numéro de téléphone existe déjà"
        })
    }


  else  if (existEmail){
        res.status(200).json({
            succeed : false,
            message : "Un contact avec le même Email existe déjà"
        })
    }

    else{

        const add  = new Contact({
            lastname : req.body.lastname,
            firstname : req.body.firstname,
            phone : req.body.phone,
            email : req.body.email,
        })
        const saved  = await add.save()

        res.status(200).json({
            succeed : true,
            message : "Contact ajouter avec succes"
        })
    }


}

const single = async (req,res) => {
    const s = await Contact.findById({_id : req.params.id})
    return res.status(200).json({
        succeed : true,
         single : s
    })
}

const update = async (req,res) => {
    await Contact.updateOne(
        {_id : req.params.id},
        {$set : req.body}
    )
    return res.status(200).json({
        succeed : true,
        message : "Contact modifié avec succes"
    })
}

const removeOneOrMany = async (req,res) => {
    const arrayOfId = req.body.id

    for (var k = 0;k < arrayOfId.length;k++){
       await Contact.findByIdAndDelete({_id : arrayOfId[k]})
    }

    return res.status(200).json({
        succeed : true,
        message : arrayOfId.length+" contact(s) supprimer avec succes"
    })
}



module.exports = {list,store,single,update,removeOneOrMany}