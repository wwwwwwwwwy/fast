import {InterFaceGroupModel,InterFaceGroupDocument} from './schema/interfaceGroup';


export async function test() {
    await InterFaceGroupModel.create({
        name:"plan",
        path:"plan/avs"
    })

    const res:InterFaceGroupDocument[] = await InterFaceGroupModel.find();

    console.log(res);
}