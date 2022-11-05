export default abstract class BaseModel {
	abstract toRequest?(): any;
	abstract toJSON(): any;

	reactive() { return reactive(this) }
}
