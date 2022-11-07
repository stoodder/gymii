import { BaseModel } from '@/models';

export default abstract class BaseResponse<M extends BaseModel = any> {
	abstract toModel?(): M
}
