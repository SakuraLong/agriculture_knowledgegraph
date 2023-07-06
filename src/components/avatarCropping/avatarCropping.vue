<template>
    <div>
        <input type="file" @change="onFileChange" />
        <canvas
            ref="canvas"
            width="400"
            height="400"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
            @wheel="onWheel"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        ></canvas>
        <button @click="saveImage">保存图片</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            context: null,
            image: null,
            dragging: false,
            lastX: 0,
            lastY: 0,
            scale: 1,
            translateX: 0,
            translateY: 0,
            touches: [],
        };
    },
    mounted() {
        this.context = this.$refs.canvas.getContext("2d");
    },
    methods: {
        onFileChange(e) {
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.onload = (e) => {
                this.image = new Image();
                this.image.onload = () => {
                    this.drawImageToCanvas();
                };
                this.image.src = e.target.result;
            };

            reader.readAsDataURL(file);
        },
        drawImageToCanvas() {
            let canvas = this.$refs.canvas;
            let context = this.context;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.save();
            context.translate(this.translateX, this.translateY);
            context.scale(this.scale, this.scale);

            context.drawImage(
                this.image,
                0,
                0,
                this.image.width,
                this.image.height
            );
            context.restore();
        },
        onMouseDown(e) {
            this.dragging = true;
            this.lastX = e.clientX;
            this.lastY = e.clientY;
        },
        onMouseMove(e) {
            if (!this.dragging) return;
            let newTranslateX = this.translateX + e.clientX - this.lastX;
            let newTranslateY = this.translateY + e.clientY - this.lastY;
            // 边界检测，当图片到达边界时限制其移动
            if (newTranslateX > 0) newTranslateX = 0;
            if (newTranslateY > 0) newTranslateY = 0;
            if (
                newTranslateX <
                this.$refs.canvas.width - this.image.width * this.scale
            )
                newTranslateX =
                    this.$refs.canvas.width - this.image.width * this.scale;
            if (
                newTranslateY <
                this.$refs.canvas.height - this.image.height * this.scale
            )
                newTranslateY =
                    this.$refs.canvas.height - this.image.height * this.scale;

            this.translateX = newTranslateX;
            this.translateY = newTranslateY;

            this.lastX = e.clientX;
            this.lastY = e.clientY;
            this.drawImageToCanvas();
        },
        onMouseUp(e) {
            this.dragging = false;
        },
        onWheel(e) {
            let newScale = this.scale * (e.deltaY < 0 ? 1.1 : 0.9);
            // 若缩放后的图片尺寸小于画布尺寸，则不进行缩放
            if (
                newScale * this.image.width < this.$refs.canvas.width ||
                newScale * this.image.height < this.$refs.canvas.height
            )
                return;
            this.scale = newScale;
            this.drawImageToCanvas();
        },
        onTouchStart(e) {
            this.touches = Array.from(e.touches);
        },
        onTouchMove(e) {
            let newTouches = Array.from(e.touches);
            if (newTouches.length === 2 && this.touches.length === 2) {
                let oldDistance = Math.hypot(
                    this.touches[0].clientX - this.touches[1].clientX,
                    this.touches[0].clientY - this.touches[1].clientY
                );
                let newDistance = Math.hypot(
                    newTouches[0].clientX - newTouches[1].clientX,
                    newTouches[0].clientY - newTouches[1].clientY
                );
                this.scale *= newDistance / oldDistance;
            }
            if (
                newTouches * this.image.width < this.$refs.canvas.width ||
                newTouches * this.image.height < this.$refs.canvas.height
            )
                return;
            this.touches = newTouches;
            this.drawImageToCanvas();
        },
        onTouchEnd(e) {
            this.touches = Array.from(e.touches);
        },
        saveImage() {
            let link = document.createElement("a");
            link.download = "image.png";
            link.href = this.$refs.canvas.toDataURL();
            link.click();
        },
    },
};
</script>

<style scoped>
canvas {
    border: 1px solid black;
}
</style>
