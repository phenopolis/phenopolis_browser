define(["rfactory!renderer"], function(rendererFactory) {

  describe("Dot source renderer", function() {

    var stageSpy, workerSpy, callbackSpy, renderer;
    beforeEach(function () {
      stageSpy = jasmine.createSpyObj('stage', ["init", "draw", "svg"]);
      workerSpy = jasmine.createSpyObj('worker', ['postMessage']);
      callbackSpy = jasmine.createSpy("callback");
      renderer = rendererFactory({
        'stage': stageSpy,
        "worker!layout-worker.js": workerSpy
      });
    });

    it("should init stage with provided element", function() {
      var element = "element";
      renderer.init(element);
      expect(stageSpy.init).toHaveBeenCalledWith(element);
    });

    it("should buffer source to be rendered until worker is initialized", function() {
      var source = "source";
      renderer.render(source);
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
    });

    it("should send source directly when worker is already initialized", function() {
      var source = "source";
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      renderer.render(source);
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
    });

    it("should draw stage with output of worker", function() {
      workerSpy.onmessage({
        data: {
          type: "stage",
          body: {}
        }
      });
      expect(stageSpy.draw).toHaveBeenCalledWith({ stage : {  }, labelAttributer : undefined, callBack : undefined });
    });

    it("should return error when rendering failed", function() {
      var output = "output", source = "source";
      renderer.errorHandler(callbackSpy);
      workerSpy.onmessage({
        data: {
          type: "ready"
        }
      });
      renderer.render(source);
      workerSpy.onmessage({
        data: {
          type: "error",
          body: output
        }
      });
      expect(workerSpy.postMessage).toHaveBeenCalledWith(source);
      expect(stageSpy.draw).not.toHaveBeenCalled();
      expect(callbackSpy).toHaveBeenCalledWith(output);
    });

    it("should return image/png when asked for image", function() {
      stageSpy.svg.andReturn('<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="100" width="100">' +
        '<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />' +
      '</svg>');

      var result = renderer.getImage();
      expect(result instanceof Image).toEqual(true);
      expect(result.complete).toEqual(true);
    });

  });
});